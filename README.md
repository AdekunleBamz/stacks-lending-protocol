# Stacks Lending Protocol

A decentralized lending protocol on Stacks that allows users to supply STX and borrow against sBTC collateral.

## Overview

This protocol enables:
- **Lending**: Supply STX and earn yield
- **Borrowing**: Use sBTC as collateral to borrow STX
- **Liquidation**: Liquidate undercollateralized positions

## Contract Functions

### Lending
- `deposit-stx`: Deposit STX into the pool
- `withdraw-stx`: Withdraw STX and earned yield
- `get-pending-yield`: Check pending yield

### Borrowing
- `borrow-stx`: Borrow STX using sBTC collateral
- `repay`: Repay borrowed STX
- `get-debt`: Calculate total debt with interest

### Liquidation
- `liquidate`: Liquidate undercollateralized positions

## Constants

- LTV: 70%
- Interest Rate: 10%
- Liquidation Threshold: 100%

## Development

```bash
clarinet test
clarinet check
```
