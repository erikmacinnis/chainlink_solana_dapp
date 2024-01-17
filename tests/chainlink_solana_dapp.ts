import * as anchor from "@project-serum/anchor";

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6"

//* not sure how to get this programID
const CHAINLINK_PROGRAM_ID = "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny"
describe("chainlink_solana_dapp", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.ChainlinkSolanaDapp

  it("Queries SOL/USD Price Feed", async() => {
    const resultAccount = anchor.web3.Keypair.generate()
    
    await program.methods.execute()
      .accounts({
        resultAccount: resultAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        chainlinkFeed: CHAINLINK_FEED,
        chainlinkProgram: CHAINLINK_PROGRAM_ID
      })
      .signers([resultAccount])
      .rpc()

    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey)
    console.log("Price is: ", latestPrice.value / 100_000_000)
  })
})
