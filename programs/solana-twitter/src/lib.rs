use anchor_lang::prelude::*;

declare_id!("EfpUgYt1dqvkdG2mneNUeDwW8PB9NBuVxFqMfK5vkgjG");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

