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
  signer: any;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService
      .checkWalletConnected()
      .then((accounts) => (this.walletId = accounts[0]));
    this.signer = this.walletService.getWeb3Signer();
  }

  vote(proposal: number) {
    console.log(this.walletId);
    console.log(proposal);
  }
}
