import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  walletId: string = '';
  provider: any;
  signer: any;
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
  }

  async vote(proposal: number) {
    const pepe = await this.provider.getBlockNumber();
    console.log(pepe);
    console.log(this.walletId);
    console.log(proposal);
  }
}
