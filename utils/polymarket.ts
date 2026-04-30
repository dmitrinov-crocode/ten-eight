const CLOB_BASE = 'https://clob.polymarket.com';
const GAMMA_BASE = 'https://gamma-api.polymarket.com';

export const USDC_POLYGON = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
export const CTF_EXCHANGE = '0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E';
export const CHAIN_ID = 137; // Polygon

const EXCHANGE_DOMAIN = {
  name: 'CTFExchange',
  version: '1',
  chainId: CHAIN_ID,
  verifyingContract: CTF_EXCHANGE as `0x${string}`,
} as const;

const ORDER_TYPES = {
  Order: [
    { name: 'salt', type: 'uint256' },
    { name: 'maker', type: 'address' },
    { name: 'signer', type: 'address' },
    { name: 'taker', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'makerAmount', type: 'uint256' },
    { name: 'takerAmount', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'feeRateBps', type: 'uint256' },
    { name: 'side', type: 'uint8' },
    { name: 'signatureType', type: 'uint8' },
  ],
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PolyToken {
  token_id: string;
  outcome: string;
  price: number;
  winner: boolean;
}

export interface PolyMarket {
  id: string;
  question: string;
  conditionId: string;
  tokens: PolyToken[];
  volume: number;
  endDate: string;
  active: boolean;
  tags: string[];
}

export interface OrderBookLevel {
  price: string;
  size: string;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  market: string;
  asset_id: string;
}

export interface SignedOrder {
  salt: string;
  maker: string;
  signer: string;
  taker: string;
  tokenId: string;
  makerAmount: string;
  takerAmount: string;
  expiration: string;
  nonce: string;
  feeRateBps: string;
  side: number;
  signatureType: number;
  signature: string;
}

// ─── Market data ─────────────────────────────────────────────────────────────

function parseJsonField<T>(field: unknown): T | null {
  if (Array.isArray(field)) return field as T;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return null;
    }
  }
  return null;
}

function gammaMarketToPolyMarket(m: any): PolyMarket {
  const outcomes: string[] = parseJsonField<string[]>(m.outcomes) ?? [];
  const prices: string[] = parseJsonField<string[]>(m.outcomePrices) ?? [];
  const tokenIds: string[] = parseJsonField<string[]>(m.clobTokenIds) ?? [];

  const tokens: PolyToken[] = outcomes.map((outcome, i) => ({
    outcome,
    token_id: tokenIds[i] ?? '',
    price: parseFloat(prices[i] ?? '0.5'),
    winner: false,
  }));

  return {
    id: m.id ?? '',
    question: m.question ?? '',
    conditionId: m.conditionId ?? '',
    tokens,
    volume: parseFloat(m.volume ?? '0'),
    endDate: m.endDate ?? '',
    active: m.active ?? false,
    tags: m.tags ?? [],
  };
}

export async function fetchUFCMarkets(): Promise<PolyMarket[]> {
  const url = new URL(`${GAMMA_BASE}/events`);
  url.searchParams.set('tag_slug', 'ufc');
  url.searchParams.set('active', 'true');
  url.searchParams.set('closed', 'false');
  url.searchParams.set('limit', '100');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Polymarket events error: ${res.status}`);

  const events: any[] = await res.json();
  const now = Date.now();

  const PROP_OUTCOMES = new Set(['yes', 'no', 'over', 'under']);

  const winnerMarkets: any[] = [];
  for (const event of events) {
    if (!event.endDate || new Date(event.endDate).getTime() <= now) continue;

    const markets: any[] = event.markets ?? [];
    // winner market = outcomes are fighter names, not prop bets
    const winner = markets.find((m: any) => {
      const outcomes = parseJsonField<string[]>(m.outcomes);
      if (!Array.isArray(outcomes) || outcomes.length !== 2) return false;
      return outcomes.every((o: string) => !PROP_OUTCOMES.has(o.toLowerCase()));
    });
    if (winner) winnerMarkets.push(winner);
  }

  winnerMarkets.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

  return winnerMarkets.map(gammaMarketToPolyMarket);
}

export async function fetchOrderBook(tokenId: string): Promise<OrderBook> {
  const res = await fetch(`${CLOB_BASE}/book?token_id=${tokenId}`);
  if (!res.ok) throw new Error(`CLOB order book error: ${res.status}`);
  return res.json();
}

// ─── Order building ───────────────────────────────────────────────────────────

export function buildOrderTypedData(
  maker: string,
  tokenId: string,
  makerAmountUsdc: bigint,
  takerAmountShares: bigint,
  side: 0 | 1, // 0 = BUY, 1 = SELL
) {
  const salt = BigInt(Math.floor(Math.random() * 1e15));

  const message = {
    salt,
    maker: maker as `0x${string}`,
    signer: maker as `0x${string}`,
    taker: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    tokenId: BigInt(tokenId),
    makerAmount: makerAmountUsdc,
    takerAmount: takerAmountShares,
    expiration: BigInt(0),
    nonce: BigInt(0),
    feeRateBps: BigInt(0),
    side,
    signatureType: 0 as const, // EOA sig
  };

  return {
    domain: EXCHANGE_DOMAIN,
    types: ORDER_TYPES,
    primaryType: 'Order' as const,
    message,
  };
}

// ─── Submission ───────────────────────────────────────────────────────────────

type MinimalAccount = {
  address: string;
  signMessage: (opts: { message: string }) => Promise<string>;
};

async function buildL1Headers(
  account: MinimalAccount,
  method: string,
  path: string,
  body = '',
): Promise<Record<string, string>> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const raw = timestamp + method.toUpperCase() + path + body;
  const signature = await account.signMessage({ message: raw });

  return {
    'POLY-ADDRESS': account.address,
    'POLY-SIGNATURE': signature,
    'POLY-TIMESTAMP': timestamp,
    'POLY-NONCE': '0',
    'Content-Type': 'application/json',
  };
}

/** Balance of USDC deposited into Polymarket (ready to trade) */
export async function fetchPolymarketBalance(account: MinimalAccount): Promise<number> {
  const path = '/balance';
  const headers = await buildL1Headers(account, 'GET', path);

  const res = await fetch(`${CLOB_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`Balance fetch error: ${res.status}`);

  const data: { balance: string } = await res.json();
  return parseFloat(data.balance);
}

/** Open positions (shares held) for the connected address */
export async function fetchPolymarketPositions(
  account: MinimalAccount,
): Promise<{ conditionId: string; tokenId: string; size: string; outcome: string }[]> {
  const path = '/positions';
  const headers = await buildL1Headers(account, 'GET', path);

  const res = await fetch(`${CLOB_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`Positions fetch error: ${res.status}`);

  return res.json();
}

export async function submitOrder(
  account: MinimalAccount,
  order: SignedOrder,
): Promise<{ orderID: string }> {
  const body = JSON.stringify({
    order,
    owner: account.address,
    orderType: 'FOK',
  });

  const headers = await buildL1Headers(account, 'POST', '/order', body);

  const res = await fetch(`${CLOB_BASE}/order`, {
    method: 'POST',
    headers,
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err?.error ?? `Order submission failed: ${res.status}`);
  }

  return res.json();
}
