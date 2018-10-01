// simpleecdsa.js
const SimpleECDSA = artifacts.require('./SimpleECDSA.sol');
const { randomBytes } = require('crypto');
contract('SimpleECDSA', async (accounts) => {  
  let simpleECDSAInstance;
  let privateKey = '0x29a50358bd197f58314159af7e50718ff69c7181efa6f5c1b19ef78171082ef5';
  let web3;
  let generatedAccount;

  before('setup contract instance', async () => {
    simpleECDSAInstance = await SimpleECDSA.new();
    const Web3 = require('web3');
    web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    generatedAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  });

  it('test sign randomMessage with ecdsa to generate signature use as a random source', async () => {
    const messageBuffer = randomBytes(32);
    const messageHex = messageBuffer.toString('hex');
    const signatureObject = generatedAccount.sign(messageHex);
    const result = await simpleECDSAInstance.callWithECDSA(
      signatureObject.messageHash,
      signatureObject.v,
      signatureObject.r,
      signatureObject.s
    );

    assert.equal(result, 1);
  });
});
