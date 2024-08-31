use anchor_lang::prelude::*;

declare_id!("6HU4LvWmDGQaZhhyE4ThME19UYTLWxmWrqZC1LdzMyoz");

#[derive(Accounts)]
pub struct UpdateDidDocument<'info> {
    #[account(mut, has_one = owner)]
    pub did_entry: Account<'info, DidEntry>,
    pub owner: Signer<'info>,
}

#[account]
pub struct DidEntry {
    pub owner: Pubkey,
    pub did: String,
    pub did_document: String,
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct RegisterDid<'info> {
    #[account(
        init,
        payer = owner,
        seeds = [b"did_entry", owner.key().as_ref()],
        bump,
        space = 8 + 32 + 36 + 1028
    )]
    pub did_entry: Account<'info, DidEntry>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[program]
pub mod did_registry {
    use super::*;

    pub fn register_did(ctx: Context<RegisterDid>, did: String, did_document: String, _bump: u8) -> Result<()> {
        let did_entry = &mut ctx.accounts.did_entry;
        did_entry.owner = *ctx.accounts.owner.key;
        did_entry.did = did;
        did_entry.did_document = did_document;
        Ok(())
    }

    // Update an existing DID document
    pub fn update_did_document(ctx: Context<UpdateDidDocument>, did_document: String) -> Result<()> {
        let did_entry = &mut ctx.accounts.did_entry;
        require!(did_entry.owner == *ctx.accounts.owner.key, CustomError::Unauthorized);
        did_entry.did_document = did_document;
        Ok(())
    }
}


#[error_code]
pub enum CustomError {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}
