import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { ethers } from 'ethers';
import { MYTOKEN_ABI } from "../../assets/MyToken";
import { TOKENIZEDBALLOT_ABI } from "../../assets/TokenizedBallot";
import { WalletConnectComponent } from '../wallet-connect/wallet-connect.component';

const MYTOKEN_ADDRESS = '0x4F4d6E7DD2Ad4F94338E2FcDE3d09c76F9F83945';
const TOKENIZEDBALLOT_ADDRESS = '0x8A5E23B3aeB923B0999E4E0162BF0886e01cfabd';
const myTokenAbi = MYTOKEN_ABI;
const tokenizedBallotAbi = TOKENIZEDBALLOT_ABI;

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  walletId: string = '';
  provider: any;
  signer: any;
  myTokenAbi: any;
  MyTokenContract: any;
  TokenizedBallotContract: any; 
  public ethereum;

  constructor(private walletService: WalletService) {
    this.ethereum = (window as any).ethereum;
  }

  ngOnInit(): void {
    this.walletService
      .checkWalletConnected()
      .then((accounts) => (this.walletId = accounts[0]));
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const MyTokenContract = new ethers.Contract(MYTOKEN_ADDRESS, myTokenAbi.abi, this.signer);
    const TokenizedBallotContract = new ethers.Contract(TOKENIZEDBALLOT_ADDRESS, tokenizedBallotAbi.abi, this.signer);
    // console.log(MyTokenContract);
    console.log(TokenizedBallotContract);
  }

  async delegate (delegateAddress: string) {
    console.log(delegateAddress);
  };

  async vote(proposal: number) {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(TOKENIZEDBALLOT_ADDRESS, tokenizedBallotAbi.abi, this.signer);
    // const pepe = await this.provider.getBlockNumber();
    // console.log(pepe);
    // console.log(this.walletId);
    // console.log(proposal);
    const voteTx = await TokenizedBallotContract['vote'](proposal, ethers.utils.parseEther("1"));
    await voteTx.wait();
    console.log("Voted!");
  }
}
