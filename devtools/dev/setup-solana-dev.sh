echo "[INFO] Setting Solana to use dev network"
solana config set --url https://api.devnet.solana.com
echo "[INFO] Generating new wallet"

echo "[INFO] Setting config to be the new wallet"
solana config set -k /Users/ashish/.config/solana/devnet.json
echo "[INFO] Sending airdrop"
