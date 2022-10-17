import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { Contract, ethers } from 'ethers';
import web3 from 'web3';
import { MYTOKEN_ABI } from '../../assets/MyToken';
import { TOKENIZEDBALLOT_ABI } from '../../assets/TokenizedBallot';
// import { WalletConnectComponent } from '../wallet-connect/wallet-connect.component';

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
  }

  async requestTokens() {
    throw new Error('Not implemented');
  }

  _delegate = new FormControl('');

  async delegate(delegateAddress: any) {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const MyTokenContract = new ethers.Contract(
      MYTOKEN_ADDRESS,
      myTokenAbi.abi,
      this.signer
    );
    const delegateTx = await MyTokenContract['delegate'](delegateAddress);
    await delegateTx.wait();
    console.log('Delegated!');
  }

  async vote(proposal: number) {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(
      TOKENIZEDBALLOT_ADDRESS,
      tokenizedBallotAbi.abi,
      this.signer
    );
    const voteTx = await TokenizedBallotContract['vote'](
      proposal,
      ethers.utils.parseEther('1')
    );
    await voteTx.wait();
    console.log('Voted!');
  }

  async getWinningProposal() {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
    const TokenizedBallotContract = new ethers.Contract(
      TOKENIZEDBALLOT_ADDRESS,
      tokenizedBallotAbi.abi,
      this.signer
    );
    const winningProposal = await TokenizedBallotContract['winningProposal']();
    console.log(winningProposal);
    window.alert(`The winning proposal is ${winningProposal}`);
    this.getWinningProposalName();
  }

  async getWinningProposalName() {
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    const TokenizedBallotContract = new ethers.Contract(
      TOKENIZEDBALLOT_ADDRESS,
      tokenizedBallotAbi.abi,
      this.signer
    );
    const winningProposalName = await TokenizedBallotContract['winnerName']();
    console.log(winningProposalName);
    window.alert(`Winner name: ${web3.utils.hexToUtf8(winningProposalName)}`);
  }

  async getVotingHistory() {
    let etherscanProvider = new ethers.providers.EtherscanProvider(
      5,
      'E416Z7BKQ1GSW2J3Q9K6YHW2DYPHGZ97N8'
    );
    const TokenizedBallotContract = new ethers.Contract(
      TOKENIZEDBALLOT_ADDRESS,
      tokenizedBallotAbi.abi,
      this.signer
    );
    etherscanProvider.getHistory(TOKENIZEDBALLOT_ADDRESS).then((history) => {
      history.forEach((tx) => {
        if (tx.data.length <= 138) {
          const pepe = [tx.from, tx.hash, tx.data[73]];
          console.log(pepe);
        }
      });
    });
  }
}
