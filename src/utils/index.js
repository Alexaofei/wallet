import { ethers } from 'ethers';
import config from '@/config';

export async function checkConnect() {
  console.log(ethers);
  let provider;
  if (typeof window.ethereum !== 'undefined') {
    // try {
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // 请求用户授权
    await provider.send('eth_requestAccounts', []);
    const list = await provider.listAccounts();
    console.log('provider===', list);
    const signer = provider.getSigner(list[0]);
    // // 获取账号地址
    const address = await signer.getAddress();
    console.log('signer===', signer);
    console.log('address===', address);
    console.log('getBalance===', provider.getBalance);
    // //查询余额
    const balance = await provider.getBalance(address);
    console.log('balance===', balance);
    // 余额是 BigNumber (in wei); 格式化为 ether 字符串
    let etherString = ethers.utils.formatEther(balance);
    console.log('Balance: ' + etherString);

    // } catch (e) {
    //   console.error('用户拒绝了访问');
    // }
  } else {
    console.log('请安装MetaMask!');
  }
}

export async function createWalletByPhrase(phrase = '', privateKey = '') {
  console.log(ethers);
  if (!phrase && !privateKey) {
    console.error('助记词和私钥至少填一个');
    return;
  }
  // 默认路径
  //   const path = ethers.utils.defaultPath;
  // 钱包私钥
  let _privateKey;
  if (phrase) {
    // 要导入的钱包助记词
    try {
      const mnemonic = ethers.Wallet.fromMnemonic(phrase);
      console.log(mnemonic);
      _privateKey = mnemonic.privateKey;
    } catch (err) {
      console.error(err);
    }
  } else {
    _privateKey = privateKey;
  }

  // 通过钱包私钥创建钱包实例
  let wallet;
  try {
    wallet = new ethers.Wallet(_privateKey);
    console.log(wallet);
  } catch (err) {
    console.error(err);
  }

  // 钱包公钥
  const publicKey = wallet.publicKey;
  // 钱包地址
  const address = wallet.address;

  // 通过用户设置的密码生成keystore文件
  const keystore_string = await wallet.encrypt(config.ETHER_PASSWORD);
  const keystore_json = JSON.parse(keystore_string);
  console.log('wallet===', wallet);
  console.log('keystore_string=== keystore_string');
}

export function getWallet(wallet) {
  return ethers.Wallet.createRandom();
}

export async function sendTransaction() {
  const web3 = new Web3('https://mainnet.infura.io/v3/8b7a5019d5414cefbdf08a0df920fa2d');

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
