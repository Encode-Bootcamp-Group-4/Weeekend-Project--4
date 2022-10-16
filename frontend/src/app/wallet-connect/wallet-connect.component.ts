import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.scss']
})
export class WalletConnectComponent implements OnInit {

  public walletConnected: boolean = false;
  public walletId: string = "";

  constructor(private walletService: WalletService) { }

  connectToWallet = async () => {
    this.walletService.connectWallet();
    window.location.reload();
  }

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    if(accounts.length > 0) {
      this.walletConnected = true;
      this.walletId = accounts[0];
    } else {
      this.walletConnected = false;
      this.walletId = "";
    }
  }

  ngOnInit(): void {
    // this.connectToWallet();
    this.checkWalletConnected();
  }

}
