import { Component, OnInit, Input } from '@angular/core';
import { ethers } from 'ethers';
import { WalletConnectComponent } from '../wallet-connect/wallet-connect.component';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  @Input() walletConnected: boolean = false;
  @Input() walletId: string = '';

  constructor() {}

  ngOnInit(): void {}

  vote(proposal: number) {
    console.log(proposal);
  }
}
