declare global {
  interface Window {
    ethereum?: any;
  }
}

import { ethers } from "ethers";
import { registrar } from "./Registrar.js";

const registrarAddress = "0x6fdB53b638EdE3281D408a29d934A3F14426E125";
const privateKey = "49d80f93c444e50be97f80807f671dbbcd9b4fc2f30373d5ed053ef77aa5c000";
const sepoliaRPC = "https://sepolia.infura.io/v3/5febed68ef3144a0a07953c30057e39b";

let provider: ethers.providers.Web3Provider;
let signer: ethers.providers.JsonRpcSigner;
let contract: ethers.Contract;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" }); // Request access to MetaMask
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      console.log("Wallet connected");
    } catch (error) {
      console.error("User rejected request", error);
    }
  } else {
    console.error("MetaMask not detected");
  }

  return signer;
}

async function initContract() {
  if (!contract) {
    contract = new ethers.Contract(registrarAddress, registrar, signer);
  }
}

async function initContractAdmin() {
  const adminProvider = new ethers.providers.JsonRpcProvider(sepoliaRPC);
  const adminSigner = new ethers.Wallet(privateKey, adminProvider);
  contract = new ethers.Contract(registrarAddress, registrar, adminSigner);
}

async function registerDomain(domain: string, numYears: number) {
  try {
    await initContract();
    const userAddress = await signer.getAddress(); // Get the current user's address
    const domainWithNil = domain + ".nil";
    await initContractAdmin();
    const registerTx = await contract.registerDomain(
      domainWithNil,
      numYears,
      userAddress
    );
    await registerTx.wait();
    const txHash = registerTx.hash;
    const transactionLink = `https://sepolia.etherscan.io/tx/${txHash}`;
    console.log(`Domain ${domain} registered for ${numYears} years`);
    console.log(`Transaction hash: ${transactionLink}`);
    return transactionLink;
  } catch (error) {
    console.error("Error registering domain:", error);
    throw error;
  }
}

async function makePayment(domain: string, numYears: number) {
  try {
    const domainWithNil = domain + ".nil";
    const price = await contract.calculateDomainPrice(domainWithNil, numYears);
    const formattedPrice = ethers.utils.formatEther(price);
    const tx = await signer.sendTransaction({
      to: registrarAddress,
      value: ethers.utils.parseEther(formattedPrice),
      data: contract.interface.encodeFunctionData("makePayment", [
        domainWithNil,
        numYears,
      ]),
    });
    await tx.wait();
    console.log(`Payment made for domain: ${domain}`);
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
}

async function getDomainPrice(domain: string, numYears: number) {
  try {
    const domainWithNil = domain + ".nil";
    console.log(`Getting price for domain ${domain}...`);
    const price = await contract.calculateDomainPrice(domainWithNil, numYears);
    const formattedPrice = ethers.utils.formatEther(price);
    console.log(
      `The price for domain ${domain} is: ${ethers.utils.formatEther(
        price
      )} ETH`
    );
    return price;
  } catch (error) {
    console.error("Error getting domain price:", error);
    throw error;
  }
}

async function isDomainRegistered(domain: string) {
  try {
    await initContract();
    const domainWithNil = domain + ".nil";
    const registered = await contract.isDomainRegistered(domainWithNil);
    console.log(`Domain ${domain} registered: ${registered}`);
    return registered;
  } catch (error) {
    console.error("Error checking domain registration:", error);
  }
}

async function registerUserDomain(domain: string, numYears: number) {
  try {
    await connectWallet();
    await initContract();
    const isRegistered = await isDomainRegistered(domain);
    if (!isRegistered) {
      await makePayment(domain, numYears);
      const regLink = await registerDomain(domain, numYears);
      return regLink;
    } else {
      console.log(`Domain ${domain} is already registered`);
      throw new Error("Domain already registered");
    }
  } catch (error) {
    console.error("Error registering user domain:", error);
    throw error;
  }
}

async function getDomainsByAddress() {
  try {
    await initContract();
    const userAddress = await signer.getAddress();
    const domains = await contract.getDomainsByUser(userAddress);
    console.log(`Domains for address ${userAddress}: ${domains}`);
    return domains;
  } catch (error) {
    console.error("Error getting domains by address:", error);
  }
  return null;
}

async function getWalletAddress() {
  try {
    if (!signer) {
      console.log("Wallet not connected");
      return null;
    }
    const address = await signer.getAddress();
    console.log(`Connected wallet address: ${address}`);
    return address;
  } catch (error) {
    console.error("Error getting wallet address:", error);
    return null;
  }
}

async function getDomainExpiryDate(domain: string) {
  try {
    await initContract();
    const expiryDate = await contract.getDomainExpiry(domain);
    console.log(`Expiry date for domain ${domain}: ${expiryDate}`);
    return expiryDate;
  } catch (error) {
    console.error("Error getting domain expiry date:", error);
    throw error;
  }
}

export {
  connectWallet,
  registerUserDomain,
  getDomainPrice,
  isDomainRegistered,
  getWalletAddress,
  getDomainsByAddress,
  getDomainExpiryDate,
};
