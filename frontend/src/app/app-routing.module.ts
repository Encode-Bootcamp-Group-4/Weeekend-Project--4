import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletConnectComponent } from './wallet-connect/wallet-connect.component';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
  { path: '', component: WalletConnectComponent },
  { path: 'wallet-connect', component: WalletConnectComponent },
  { path: 'voting', component: VotingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
