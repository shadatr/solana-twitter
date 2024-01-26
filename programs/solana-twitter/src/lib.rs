use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use std::convert::Into;

declare_id!("EfpUgYt1dqvkdG2mneNUeDwW8PB9NBuVxFqMfK5vkgjG");

#[program]
pub mod solana_twitter {
    
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> ProgramResult {
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if topic.chars().count() > 50 {
            return Err(ErrorCode::TopicTooLong.into());
        }
    
        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into())
        }
    
        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;
    
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; 
const MAX_TOPIC_LENGTH: usize = 50 * 4; 
const MAX_CONTENT_LENGTH: usize = 280 * 4; 

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH 
        + TIMESTAMP_LENGTH 
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH 
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; 
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}

impl From<ErrorCode> for ProgramError {
    fn from(error: ErrorCode) -> Self {
        match error {
            ErrorCode::TopicTooLong => ProgramError::Custom(1), // Replace with the actual error code
            ErrorCode::ContentTooLong => ProgramError::Custom(2), // Replace with the actual error code
        }
    }
}