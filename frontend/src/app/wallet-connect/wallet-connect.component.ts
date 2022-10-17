import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.scss'],
})
export class WalletConnectComponent {
  public walletConnected: boolean = false;
  public walletId: string = '';

  constructor(private walletService: WalletService, private router: Router) {}

  connectToWallet = async () => {
    this.walletService.connectWallet().then(() => this.checkWalletConnected());
    // window.location.reload();
  };

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    if (accounts.length > 0) {
      this.walletConnected = true;
      this.walletId = accounts[0];
      this.router.navigate(['/voting']);
    } else {
      this.walletConnected = false;
      this.walletId = '';
      this.router.navigate(['']);
    }
  };
}
