use anchor_lang::prelude::*;

declare_id!("J31qcCrD5wyFTKyRhD7z3FTfWq24NZ1AMUWnn7g9GDBx");

#[program]
pub mod issuer_registry {
    use super::*;

    pub fn register_issuer(ctx: Context<RegisterIssuer>, did: String, issuer_data: String) -> Result<()> {
        let issuer = &mut ctx.accounts.issuer;
        issuer.owner = *ctx.accounts.owner.key;
        issuer.did = did;
        issuer.issuer_data = issuer_data;
        Ok(())
    }

    pub fn update_issuer_data(ctx: Context<UpdateIssuer>, new_issuer_data: String) -> Result<()> {
        let issuer = &mut ctx.accounts.issuer;
        require!(issuer.owner == *ctx.accounts.owner.key, ErrorCode::Unauthorized);
        issuer.issuer_data = new_issuer_data;
        Ok(())
    }
}

#[account]
pub struct Issuer {
    pub owner: Pubkey,
    pub did: String,
    pub issuer_data: String,
}

#[derive(Accounts)]
pub struct RegisterIssuer<'info> {
    #[account(
        init,
        payer = owner,
        seeds = [b"issuer", owner.key().as_ref()],
        bump,
        space = 8 + 32 + 4 + 32 + 512 // Fixed sizes for `did` and `issuer_data`
    )]
    pub issuer: Account<'info, Issuer>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateIssuer<'info> {
    #[account(
        mut,
        has_one = owner,
        seeds = [b"issuer", owner.key().as_ref()],
        bump
    )]
    pub issuer: Account<'info, Issuer>,
    pub owner: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}
