import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { ethers } from 'ethers';
import web3 from 'web3';
import { MYTOKEN_ABI } from "../../assets/MyToken";
import { TOKENIZEDBALLOT_ABI } from "../../assets/TokenizedBallot";
import { WalletConnectComponent } from '../wallet-connect/wallet-connect.component';
import { ApiService } from '../api.service';

const MYTOKEN_ADDRESS = '0x4F4d6E7DD2Ad4F94338E2FcDE3d09c76F9F83945';
const TOKENIZEDBALLOT_ADDRESS = '0x151427884B81dF42f8C8832A21E7Aa2D1CcF5fd3';
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
  user: any;
  myTokenAbi: any;
  MyTokenContract: any;
  tokenContractAddress: any;
  TokenizedBallotContract: any; 
  public ethereum;

  constructor(private walletService: WalletService, private apiService: ApiService) {
    this.ethereum = (window as any).ethereum;
  }

  ngOnInit(): void {
    // this.apiService.getContractAddress().subscribe((response) => {
    //   this.tokenContractAddress = response.result;
    // });
    this.apiService.postMintTokens
    this.walletService
    .checkWalletConnected()
    .then((accounts) => (this.walletId = accounts[0]));

  }

  getContractAddress() {
    return { result: MYTOKEN_ADDRESS };
  }

  _amount = new FormControl(0);

  async requestTokens (amt: any) {
    console.log(amt);
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    let user = await this.signer.getAddress();
    // console.log(this.user);
    this.apiService.postMintTokens(user, amt).subscribe((response) => {
      console.log(response);
    });
    console.log("Tokens requested!");
    window.alert(`You have requested ${amt} tokens. They should appear in your wallet shortly.`);
  };

  _delegate = new FormControl('');

  async delegate (delegateAddress: any) {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const MyTokenContract = new ethers.Contract(MYTOKEN_ADDRESS, myTokenAbi.abi, this.signer);
    const delegateTx = await MyTokenContract['delegate'](delegateAddress);
    await delegateTx.wait();
    console.log("Delegated!");
    window.alert(`You have delegated 1 vote to ${delegateAddress}`);
  };

  async vote(proposal: number) {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(TOKENIZEDBALLOT_ADDRESS, tokenizedBallotAbi.abi, this.signer);
    const voteTx = await TokenizedBallotContract['vote'](proposal, ethers.utils.parseEther("1"));
    await voteTx.wait();
    console.log("Voted!");
    window.alert(`You have spent 1 token to voted for proposal ${proposal}`);
  }

  async getWinningProposal() {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(TOKENIZEDBALLOT_ADDRESS, tokenizedBallotAbi.abi, this.signer);
    const winningProposal = await TokenizedBallotContract['winningProposal']();
    console.log(winningProposal);
    window.alert(`The winning proposal is ${winningProposal}`);
    this.getWinningProposalName();
  }

  async getWinningProposalName() {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(TOKENIZEDBALLOT_ADDRESS, tokenizedBallotAbi.abi, this.signer);
    const winningProposalName = await TokenizedBallotContract['winnerName']();
    console.log(winningProposalName);
    window.alert(`Winner name: ${web3.utils.hexToUtf8(winningProposalName)}`)
  }
}
