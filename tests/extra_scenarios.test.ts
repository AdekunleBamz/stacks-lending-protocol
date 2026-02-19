
import { Cl, ClarityType, cvToValue } from "@stacks/transactions";
import { beforeEach, describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const faucet = accounts.get("faucet")!;
const lender = accounts.get("wallet_2")!;
const borrower = accounts.get("wallet_3")!;

function mintSTX(amount: number, recipient: string) {
    const { result } = simnet.transferSTX(amount, recipient, faucet);
    expect(result).toBeOk(Cl.bool(true));
}

function initializeOracle() {
    const { result } = simnet.callPublicFn(
        "mock-oracle",
        "initialize",
        [Cl.principal(accounts.get("wallet_1")!)],
        deployer
    );
    expect(result).toBeOk(Cl.bool(true));
}

describe("Lending Pool Extra Scenarios", () => {
    beforeEach(() => {
        initializeOracle();
        mintSTX(100_000_000, lender);
    });

    it("Should fail when withdrawing more than deposited", () => {
        // Deposit 100 STX
        simnet.callPublicFn("lending-pool", "deposit-stx", [Cl.uint(100)], lender);

        // Try to withdraw 200 STX
        const result = simnet.callPublicFn(
            "lending-pool",
            "withdraw-stx",
            [Cl.uint(200)],
            lender
        );

        // Expect ERR_INVALID_WITHDRAW_AMOUNT (u100)
        expect(result.result).toBeErr(Cl.uint(100));
    });

    it("Should fail when depositing without withdrawing previous position", () => {
        // Deposit 100 STX
        simnet.callPublicFn("lending-pool", "deposit-stx", [Cl.uint(100)], lender);

        // Try to deposit again without withdrawing
        const result = simnet.callPublicFn(
            "lending-pool",
            "deposit-stx",
            [Cl.uint(100)],
            lender
        );

        // Expect ERR_MUST_WITHDRAW_BEFORE_NEW_DEPOSIT (u103)
        expect(result.result).toBeErr(Cl.uint(103));
    });
});
