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
pub struct DidEntry {
    pub owner: Pubkey,
    pub did: String,
    pub did_document: String,
}

#[derive(Accounts)]
pub struct RegisterIssuer<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 36 + 1024)]
    pub issuer: Account<'info, Issuer>,
    #[account(mut)]
    pub owner: Signer<'info>,
    /// CHECK: This is only a reference to an existing DID entry, not an account we're creating or modifying
    #[account(constraint = did_entry.owner == issuer.owner)]
    pub did_entry: Account<'info, DidEntry>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateIssuer<'info> {
    #[account(mut, has_one = owner)]
    pub issuer: Account<'info, Issuer>,
    pub owner: Signer<'info>,
}

#[account]
pub struct Issuer {
    pub owner: Pubkey,
    pub did: String,
    pub issuer_data: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}
