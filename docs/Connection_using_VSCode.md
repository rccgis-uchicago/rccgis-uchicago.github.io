### Midway3 Dedicated Connection Setup
Windows users will need to authenticate each time with a password and 2FA, as `ControlMaster` is not supported. For more seamless integration, consider using the VSCode Remote Development extensions with the alternative authentication method described in the VSCode documentation [here](link).
#### Prerequisites
- Install the latest version of Visual Studio Code (VSCode).
- Install the latest version of the `Remote Development` extension pack, available [here](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

#### Setup for Mac and Linux Users (One-time Configuration)
1. Update your local SSH configuration file (typically `~/.ssh/config`) by adding:
   ```bash
   Host midway3
     ControlMaster auto
     ControlPath ~/.ssh/master-%r@%h:%p
     HostName midway3.rcc.uchicago.edu
     User <username>

   Host hpcx
     ProxyCommand ssh midway3 nc $(/software/slurm-current-el8-x86_64/bin/squeue --me --name=tunnel --states=R -h -O NodeList,Comment)
     StrictHostKeyChecking no
     User <username>
   ```
2. On the cluster, create a batch script in your home directory (`~`) named `tunnel.sh` with the following content:
   ```bash
   #!/bin/bash

   #SBATCH --output="tunnel.log"
   #SBATCH --reservation=<reservationID>
   #SBATCH --account=<pi-cnetid>
   #SBATCH --job-name="tunnel"
   #SBATCH --time=12:00:00
   #SBATCH --cpus-per-task=2

   # Find an open port
   PORT=$(python -c 'import socket; s=socket.socket(); s.bind(("", 0)); print(s.getsockname()[1]); s.close()')
   scontrol update JobId="$SLURM_JOB_ID" Comment="$PORT"
   echo "Starting sshd on port $PORT"
   /usr/sbin/sshd -D -p ${PORT} -f /dev/null -h ${HOME}/.ssh/id_ecdsa
   ```

#### Daily Connection Steps
1. Open a local terminal and connect using `ssh midway3`. Once logged in, execute `sbatch tunnel.sh`. Keep this terminal open throughout the day to maintain the connection without re-authenticating.
2. Use VSCode to connect to your projects by selecting the ssh target `hpcx` in the `Remote Explorer`.
3. Additional terminal windows can connect to the HPC via `ssh hpcx`.

#### Notes:
- Replace `<username>` with your UChicago username.
- Modify the `pi-cnetid` in the `tunnel.sh` script to your pi/group id or omit the reservationID if not applicable.
- For GPU-intensive tasks, add the `--gres=gpu:1` option to the `tunnel.sh` script.

### Approach for Windows Users

### Alternative Approach Using GitHub or Microsoft Account for Authentication
This method utilizes the VSCode command-line interface and your GitHub or Microsoft account for authentication, providing a potentially more reliable connection method:
1. **One-time setup on the cluster:**
   Download and extract the VSCode CLI:
   ```bash
   curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
   tar -xf vscode_cli.tar.gz
   ```
2. **Daily login:**
   Request an interactive resource and start the tunnel:
   ```bash
   srun --nodes=1 --cpus-per-task=2 --mem-per-cpu=4G --time=12:00:00 --pty bash -i
   ./code tunnel
   ```
   Follow the prompts to authenticate and start coding via the provided URL or through VSCode's Remote Explorer by searching for your tunnel.

These steps ensure both ease of use and consistency across different operating systems while leveraging advanced features like VSCode's remote development capabilities.
