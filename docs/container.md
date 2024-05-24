
# Containers and High-Performance Computing (HPC)


Containers simplify the complexities of software by encapsulating an application, its dependencies, and configuration into a single image. This allows users to easily pull images and run their code, promoting shareability and portability of software.

Singularity vs. Docker

Singularity is an open-source container platform known for its simplicity, speed, and security. Unlike Docker, which requires root privileges to operate containers, Singularity is optimized for shared multiuser systems and high-performance computing (HPC) environments. It seamlessly works with Docker images, supports GPUs, and facilitates MPI applications.

Advantages of Using Containers

- Streamlined workflows through containerization
- Portable software environments for enhanced collaboration
- Access to software incompatible with cluster operating systems
- Ability to build and utilize custom software
- Sharing software across research groups
- Simplified distribution of complex software packages

Popular Container Registries

When seeking containerized software, several recommended repositories include:

- https://cloud.sylabs.io/
- https://hub.docker.com/
- https://autamus.io/
- https://e4s-project.github.io/

Pulling Containers

When pulling containers, Singularity typically creates a ~/.singularity directory in the home directory to store cache files. To avoid exceeding the /home quota with cache data, consider setting the SINGULARITY_CACHEDIR environment variable to point to a scratch directory.

   export SINGULARITY_CACHEDIR=$SCRATCH/$USER/.singularity

To manage cache files efficiently, you can list, view detailed information, clean, or clear cache data based on your needs.
  
  singularity cache list
  singularity cache list -v
  singularity cache clean
  

Pulling images involves creating Singularity Image Files (SIF) in the current directory and inspecting them for essential details.

singularity pull docker://ubuntu

Run and Execute Commands

The commands available for running operations within a container include:

- Singularity exec: for executing commands inside the container
- Singularity run: for running predefined runscripts in the container
- Singularity shell: for initiating an interactive shell session within the container

These commands are useful for exploring files, executing specific tasks, and understanding the container's contents.

Job Submission
Job submission scripts specify job details such as name, nodes, tasks, partition, output files, runtime, email notifications, and required modules. Singularity is loaded within the script to execute commands in the container.

.. code-block:: console                                                     
   

   #!/bin/bash
   #SBATCH --job-name=testJob          # job name                           
   #SBATCH --nodes=1                   # node(s) required for job           
   #SBATCH --ntasks=48                 # number of tasks per node           
   #SBATCH --partition=general         # name of partition to submit job    
   #SBATCH --output=test-%j.out        # Output file. %j is replaced with job ID
   #SBATCH --error=test_error-%j.err   # Error file. %j is replaced with job ID
   #SBATCH --time=01:00:00             # Run time (D-HH:MM:SS)              
   #SBATCH --mail-type=ALL             # will send email for begin,end,fail 
   #SBATCH --mail-user=user@rcc.uchicago.edu       

   module load singularity

   singularity exec /path/to/<container image> <arg1> <arg2> 



For parallel MPI code, additional considerations are made regarding nodes, tasks, MPI versions, and executing commands using Singularity within the MPI environment.

.. code-block:: console                                                     
   

   #!/bin/bash
   #SBATCH --job-name=testJob          # job name                           
   #SBATCH --nodes=2                   # node(s) required for job           
   #SBATCH --ntasks=48                 # number of tasks per node           
   #SBATCH --partition=general         # name of partition to submit job    
   #SBATCH --output=test-%j.out        # Output file. %j is replaced with job ID
   #SBATCH --error=test_error-%j.err   # Error file. %j is replaced with job ID
   #SBATCH --time=01:00:00             # Run time (D-HH:MM:SS)              
   #SBATCH --mail-type=ALL             # will send email for begin,end,fail 
   #SBATCH --mail-user=user@rcc.uchicago.edu       

   module load singularity
   module load openmpi/5.0.2
   
   srun singularity exec /path/to/<container image> <arg1> <arg2> 

Building an Image

Building images on the Midway cluster using Singularity is not supported. It is recommended to create images on a local machine and transfer them to the cluster. Sylabs.io offers a remote builder feature allowing secure image creation using a definition file.

https://cloud.sylabs.io/builder