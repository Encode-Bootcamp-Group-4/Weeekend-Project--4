import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as TokenJSON from "./assets/MyToken.json";
import * as TokenizedBallotJSON from "./assets/TokenizedBallot.json";

const MYTOKEN_ADDRESS = '0x8AE3C9bf30481901ce9B5b8AEAAc214aA67ec81F'; // MyToken contract address (Bryce deployed)
const TOKENIZEDBALLOT_ADDRESS = '0xA56c8B251433a29c4aB216D0bC2f6A38CD1B17a0'; // TokenizedBallot contract address (Bryce deployed)
// const MYTOKEN_ADDRESS = '0x4F4d6E7DD2Ad4F94338E2FcDE3d09c76F9F83945'; // MyToken contract address (Marco deployed)
// const TOKENIZEDBALLOT_ADDRESS = '0x8A5E23B3aeB923B0999E4E0162BF0886e01cfabd'; // TokenizedBallot contract address (Marco deployed)
const MYTOKEN_ABI = TokenJSON.abi; // MyToken contract ABI
const TOKENIZEDBALLOT_ABI = TokenizedBallotJSON.abi; // TokenizedBallot contract ABI

@Injectable()
export class AppService {
  
  // init
  provider: ethers.providers.Provider;
  myTokenContract: ethers.Contract;
  myTokenSignedContract: ethers.Contract;
  tokenizedBallotContract: ethers.Contract;
  tokenizedBallotSignedContract: ethers.Contract;
  
  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.myTokenContract = new ethers.Contract(
      MYTOKEN_ADDRESS, 
      MYTOKEN_ABI, 
      this.provider
    );
    this.tokenizedBallotContract = new ethers.Contract(
      TOKENIZEDBALLOT_ADDRESS,
      TOKENIZEDBALLOT_ABI,
      this.provider
    );
    const pkey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(pkey, this.provider);
    const signer = wallet.connect(this.provider);
    this.myTokenSignedContract = this.myTokenContract.connect(signer);
    this.tokenizedBallotSignedContract = this.tokenizedBallotContract.connect(signer);
  }

  async mintTokens (to: string, amt: number) {
    // mint new tokens here!
    const tx = await this.myTokenSignedContract.mint(
      to, 
      ethers.utils.parseEther(amt.toString())
    );
    return tx;
  }

  getTokenAddress() {
    return { result: MYTOKEN_ADDRESS };
  };

}
