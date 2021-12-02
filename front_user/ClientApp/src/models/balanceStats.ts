import { Balance } from "./balance";

export interface BalanceStats {
  balance: Balance;
  operationsCount: number;
  outgoingAmountInCents: number;
  incomingAmountInCents: number;
}
