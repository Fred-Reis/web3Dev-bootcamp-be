const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("wave contract deployed to: ", waveContract.address);
  // console.log("wave contract deployed by: ", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log("total waves: ", waveCount.toNumber());

  let waveTxn = await waveContract.wave("Some message!");
  await waveTxn.wait();

  // waveCount = await waveContract.getTotalWaves();

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
