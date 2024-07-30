use anchor_lang::prelude::*;

declare_id!("CnyWZyPW3VEg6PzmrChAGNSwdfDi4Wc7naWRtzZgnSpk");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
