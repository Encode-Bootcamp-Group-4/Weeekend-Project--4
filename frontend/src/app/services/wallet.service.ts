import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public ethereum;
  constructor() {
    this.ethereum = (window as any).ethereum;
  }

  public connectWallet = async () => {
    try {
      if (!this.ethereum) return alert('Please install Metamask');
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } catch (e) {
      throw new Error('Error connecting to Metamask');
    }
  };

  public checkWalletConnected = async () => {
    try {
      if (!this.ethereum) return alert('Please install Metamask');
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      return accounts;
    } catch (e) {
      throw new Error('Error getting accounts from Metamask');
    }
  };

  public getProvider = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(this.ethereum);
      return provider;
    } catch (e) {
      throw new Error('cannot get signer');
    }
  };

  public getWeb3Signer = async () => {
    try {
      const provider = await this.getProvider();
      const signer = provider.getSigner();
      return signer;
    } catch (e) {
      throw new Error('cannot get signer');
    }
  };
}
