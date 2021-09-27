echo "[INFO] Setting Solana to use mainnet network"
solana config set --url https://api.mainnet-beta.solana.com
echo "[INFO] Importing wallet"
echo "[INFO] Setting config to be the new wallet"
solana config set -k ~/.config/solana/devnet.json
solana address > ./logs/main/wallet-log.txt
echo "[INFO] Getting Wallet Balance"
solana balance
