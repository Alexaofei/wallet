import { Web3 } from 'web3';

export function initWeb3(rpcURL) {
  window.web3 = new Web3({
    provider: rpcURL,
    config: {
      defaultTransactionType: '0x0',
    },
  });
  console.log('config===', web3.getContextObject().config);
}

export async function sendTransaction() {
  web3.eth.getBlockNumber().then(console.log);
  const account = web3.eth.accounts.wallet.add('0x63eaae519c934236dd8f5c4c3a8bec571c923cd616328577d645592e4dfb54b1');

  console.log('account====', account);
  console.log('address===', account[0].address);
  //↳ 0xcE6A5235d6033341972782a15289277E85E5b305

  console.log('privateKey====', account[0].privateKey);
  //create transaction object to send 1 eth to '0xa32...c94' address from the account[0]
  const tx = {
    from: account[0].address,
    to: '0xa3286628134bad128faeef82f44e99aa64085c94',
    value: web3.utils.toWei('1', 'ether'),
  };
  //the `from` address must match the one previously added with wallet.add

  //send the transaction
  const txReceipt = await web3.eth.sendTransaction(tx);

  console.log('Tx hash:', txReceipt.transactionHash);
}

export async function createWallet() {
  console.log(1);
  const wallet = web3.eth.accounts.wallet.create();
  console.log(wallet);
  const privateKey = '0x63eaae519c934236dd8f5c4c3a8bec571c923cd616328577d645592e4dfb54b1';
  web3.eth.accounts.wallet.add(privateKey);
  console.log(2, wallet[0].address);
  //   const balance = await web3.eth.getBalance(wallet[0].address);
  //   console.log('balance===', balance);
  const account = web3.eth.accounts.create();
  web3.eth.accounts.wallet.add(account);
  console.log('wallet===', wallet);
  // wei转换为ehter
  //   console.log(web3.utils.fromWei(100, 'ether'));
}
