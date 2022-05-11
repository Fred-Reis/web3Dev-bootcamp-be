const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("wave contract deployed to address: ", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log("total waves: ", waveCount.toNumber());

  let waveTxn = await waveContract.wave("Some message!");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait();

  // waveCount = await waveContract.getTotalWaves();
  let allWaves = await waveContract.getAllWaves();
  console.log("all waves: ", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
