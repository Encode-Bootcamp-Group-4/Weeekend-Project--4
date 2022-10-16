import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as TokenJSON from "./assets/MyToken.json";


const CONTRACT_ADDRESS = '0x4F4d6E7DD2Ad4F94338E2FcDE3d09c76F9F83945'; // MyToken contract address
const ABI = TokenJSON.abi; // MyToken contract ABI

@Injectable()
export class AppService {
  // init
  provider: ethers.providers.Provider;
  contract: ethers.Contract;
  
  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS, 
      ABI, 
      this.provider
    );
  }

  async mintTokens (to: string, amt: number) {
    // mint new tokens here!
    const pkey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(pkey, this.provider);
    const signer = wallet.connect(this.provider);
    const signedContract = this.contract.connect(signer);

    const tx = await signedContract.mint(
      to, 
      ethers.utils.parseEther(amt.toString())
    );
    return tx;
  }
}
