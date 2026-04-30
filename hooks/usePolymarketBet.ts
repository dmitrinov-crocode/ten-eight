import { useState, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { getContract, readContract, prepareContractCall, sendTransaction } from 'thirdweb';
import { polygon } from 'thirdweb/chains';
import { thirdwebClient } from '@/constants/thirdweb';
import {
  USDC_POLYGON,
  CTF_EXCHANGE,
  fetchOrderBook,
  fetchPolymarketBalance,
  fetchPolymarketPositions,
  buildOrderTypedData,
  submitOrder,
  SignedOrder,
} from '@/utils/polymarket';

const MAX_UINT256 = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935');

export interface PlaceBetParams {
  tokenId: string;
  usdcAmount: number;
  side?: 0 | 1; // 0 = BUY (default)
}

export function usePolymarketBet() {
  const account = useActiveAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getUsdcBalance = useCallback(async (): Promise<number> => {
    if (!account) return 0;
    try {
      const usdcContract = getContract({
        client: thirdwebClient,
        chain: polygon,
        address: USDC_POLYGON,
      });
      const balance = await readContract({
        contract: usdcContract,
        method: 'function balanceOf(address account) view returns (uint256)',
        params: [account.address as `0x${string}`],
      });
      return Number(balance) / 1e6;
    } catch {
      return 0;
    }
  }, [account]);

  const placeBet = useCallback(
    async ({ tokenId, usdcAmount, side = 0 }: PlaceBetParams): Promise<string> => {
      if (!account) throw new Error('Connect your wallet first');
      if (usdcAmount <= 0) throw new Error('Enter a valid amount');

      setLoading(true);
      setError('');

      try {
        const usdcContract = getContract({
          client: thirdwebClient,
          chain: polygon,
          address: USDC_POLYGON,
        });

        // Check USDC allowance for CTF Exchange, approve if needed
        const allowance = await readContract({
          contract: usdcContract,
          method: 'function allowance(address owner, address spender) view returns (uint256)',
          params: [account.address as `0x${string}`, CTF_EXCHANGE as `0x${string}`],
        });

        const makerAmountRaw = BigInt(Math.round(usdcAmount * 1e6));
        if (allowance < makerAmountRaw) {
          const approveTx = prepareContractCall({
            contract: usdcContract,
            method: 'function approve(address spender, uint256 amount) returns (bool)',
            params: [CTF_EXCHANGE as `0x${string}`, MAX_UINT256],
          });
          await sendTransaction({ transaction: approveTx, account });
        }

        // Fetch current order book to get the best price
        const book = await fetchOrderBook(tokenId);
        const level = side === 0 ? book.asks[0] : book.bids[0];
        if (!level) throw new Error('No liquidity available for this outcome');

        const price = parseFloat(level.price);
        if (price <= 0 || price >= 1) throw new Error('Invalid market price');

        const makerAmountUsdc = BigInt(Math.round(usdcAmount * 1e6));
        const takerAmountShares = BigInt(Math.round((usdcAmount / price) * 1e6));

        // Build EIP-712 typed data and sign with the connected wallet
        const typedData = buildOrderTypedData(
          account.address,
          tokenId,
          makerAmountUsdc,
          takerAmountShares,
          side,
        );

        const signature = await account.signTypedData(typedData);

        const signedOrder: SignedOrder = {
          salt: typedData.message.salt.toString(),
          maker: typedData.message.maker,
          signer: typedData.message.signer,
          taker: typedData.message.taker,
          tokenId,
          makerAmount: makerAmountUsdc.toString(),
          takerAmount: takerAmountShares.toString(),
          expiration: '0',
          nonce: '0',
          feeRateBps: '0',
          side,
          signatureType: 0,
          signature,
        };

        const result = await submitOrder(account, signedOrder);
        return result.orderID;
      } catch (e: any) {
        const msg = e?.message ?? 'Failed to place bet';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [account],
  );

  /** USDC deposited inside Polymarket and available for betting */
  const getPolymarketBalance = useCallback(async (): Promise<number> => {
    if (!account) return 0;
    return fetchPolymarketBalance(account);
  }, [account]);

  /** Shares currently held in open positions */
  const getPositions = useCallback(async () => {
    if (!account) return [];
    return fetchPolymarketPositions(account);
  }, [account]);

  return {
    placeBet,
    getUsdcBalance,
    getPolymarketBalance,
    getPositions,
    loading,
    error,
    isConnected: !!account,
    address: account?.address,
  };
}
