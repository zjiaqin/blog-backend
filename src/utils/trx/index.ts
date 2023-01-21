// TRX转账
export const payTRX = async (fromAddress: string, toAddress: string, amount: number) => {
  const resp = { res: null, err: '' };
  if (!(window as any).tronWeb || !(window as any).tronWeb.ready) {
    resp.err = 'tronLink error:tronLink not Connect';
    return resp;
  }

  try {
    const tx = await (window as any).tronWeb.transactionBuilder.sendTrx(
      toAddress,
      (window as any).tronWeb.toSun(amount),
      fromAddress,
    );

    const signedTx = await (window as any).tronWeb.trx.sign(tx);
    const broastTx = await (window as any).tronWeb.trx.sendRawTransaction(signedTx);
    if (!broastTx.result) {
      resp.err = broastTx.code;
      return resp;
    }
    resp.res = broastTx;
    return resp;
  } catch (error: any) {
    console.log(error);
    resp.err = error;
    return resp;
  }
};

// USD转账
export const payUSDT = async (fromAddress: string, toAddress: string, amount: number) => {
  const resp = { res: null, err: '' };
  if (!(window as any).tronWeb || !(window as any).tronWeb.ready) {
    resp.err = 'tronLink error:tronLink not Connect';
    return resp;
  }

  try {
    const host = (await (window as any).tronWeb.eventServer.host) as string;
    const contractAddress =
      'https://api.trongrid.io' === host
        ? 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
        : 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';
    const parameter = [
      { type: 'address', value: toAddress },
      { type: 'uint256', value: (window as any).tronWeb.toSun(amount) },
    ];
    const transaction = await (window as any).tronWeb.transactionBuilder.triggerSmartContract(
      contractAddress,
      'transfer(address,uint256)',
      {},
      parameter,
      (window as any).tronWeb.address.toHex(fromAddress),
    );
    transaction.transaction.data = '';
    const signedTx = await (window as any).tronWeb.trx.sign(transaction.transaction);
    const broastTx = await (window as any).tronWeb.trx.sendRawTransaction(signedTx);

    if (!broastTx.result) {
      resp.err = broastTx.code;
      return resp;
    }
    resp.res = broastTx;
    return resp;
  } catch (error: any) {
    console.log(error);
    resp.err = error;
    return resp;
  }
};

// 质押
//  amount	要质押的TRX的数量（单位是SUN）。	Integer
// duration	质押 TRX 的天数，至少 3 天。	Integer
// resource	质押 TRX 获取的资源，必须是 “BANDWIDTH” 或 “ENERGY”。	String
// ownerAddress (可选的)	质押的 TRX 所有者的地址（默认为调用者的地址）。	String
// receiverAddress	接收资源的其他用户的地址。	String
// options	可选参数，多重签名时使用，设置交易多重签名时使用的permissionId。	Integer
// amount = toSun(1)
export const freezeBalance = async (
  amount: number,
  duration: number,
  ownerAddress: string,
  receiverAddress: string,
  resource: string,
  options: any,
) => {
  const resp = { res: null, err: '' };
  if (!(window as any).tronWeb || !(window as any).tronWeb.ready) {
    resp.err = 'tronLink error:tronLink not Connect';
    return resp;
  }
  if (amount <= 0) {
    resp.err = 'amount  invalid';
    return resp;
  }
  if (duration < 3 || duration > 30) {
    resp.err = 'duration  invalid';
    return resp;
  }
  if (ownerAddress === '') {
    resp.err = 'ownerAddress  empty';
    return resp;
  }
  if (receiverAddress === '') {
    resp.err = 'receiverAddress  empty';
    return resp;
  }
  if (!['ENERGY', 'BANDWIDTH'].includes(resource)) {
    resp.err = 'resource must ENERGY or BANDWIDTH ';
    return resp;
  }
  try {
    const freezeBalanceTx = await (window as any).tronWeb.transactionBuilder.freezeBalance(
      amount,
      duration,
      resource,
      ownerAddress,
      receiverAddress,
      options,
    );
    const signedTx = await (window as any).tronWeb.trx.sign(freezeBalanceTx);
    const broastTx = await (window as any).tronWeb.trx.sendRawTransaction(signedTx);
    if (!broastTx.result) {
      resp.err = broastTx.code;
      return resp;
    }
    resp.res = broastTx;
  } catch (error: any) {
    resp.err = error;
    return resp;
  }
};

// 解压
// resource	指定资源类型。 必须是“ BANDWIDTH”或“ ENERGY”。	string
// address (optional)	要解锁的 TRX 所有者的地址 (默认为交易发起者地址)。(格式：hexstring 或 base58)	string
// receiver address	由于取消质押而要从中删除资源的账户地址。(hexstring 或 base58)	string
// options	permission Id 用于多重签名
export const unfreezeBalance = async (
  address: string,
  receiverAddress: string,
  resource: string,
) => {
  const resp = { res: null, err: '' };
  if (!(window as any).tronWeb || !(window as any).tronWeb.ready) {
    resp.err = 'tronLink error:tronLink not Connect';
    return resp;
  }
  if (address === '') {
    resp.err = 'address  empty';
    return resp;
  }
  if (receiverAddress === '') {
    resp.err = 'receiverAddress  empty';
    return resp;
  }

  if (!['ENERGY', 'BANDWIDTH'].includes(resource)) {
    resp.err = 'resource must ENERGY or BANDWIDTH ';
    return resp;
  }

  try {
    const unfreezeBalanceResp = await (window as any).tronWeb.transactionBuilder.unfreezeBalance(
      resource,
      address,
      receiverAddress,
    );
    const signedTx = await (window as any).tronWeb.trx.sign(unfreezeBalanceResp);
    const broastTx = await (window as any).tronWeb.trx.sendRawTransaction(signedTx);
    if (!broastTx.result) {
      resp.err = broastTx.code;
      return resp;
    }
    resp.res = broastTx;
    return resp;
  } catch (error: any) {
    resp.err = error;
    return resp;
  }
};

// 空签名
export const sign = async (signContent: any) => {
  const resp = { res: null, err: '' };
  if (!(window as any).tronWeb) {
    resp.err = 'tronLink error:tronLink not Connect';
    return resp;
  }

  try {
    const signedTx = await (window as any).tronWeb.trx.sign(
      (window as any).tronWeb.toHex(signContent),
    );
    resp.res = signedTx;
    return resp;
  } catch (error: any) {
    console.log(error);
    resp.err = error;
    return resp;
  }
};

export const openTransaction = (txid: string) => {
  window.open(`https://tronscan.org/#/transaction/${txid}`, '_blank');
};

export const openAddress = (wallet: string) => {
  window.open(`https://tronscan.org/#/address/${wallet}`, '_blank');
};
