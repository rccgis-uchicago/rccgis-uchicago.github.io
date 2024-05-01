---
title: Conda vs Environment Modules on Midway3
---
# Conda vs Environment Modules

Using a Conda environment allows you to configure a custom setup from the outset. Begin by loading an Anaconda module and then create a new environment, specifying a name and the packages you want to include.

It's important to note that on Midway3, there is a pre-installed default Anaconda environment (`base`) with many packages already available. However, you cannot extend this default environment, which is why creating a new one might be necessary.

We recommend installing all required packages simultaneously, as Conda attempts to resolve package compatibility during each installation. Installing everything at once means Conda only needs to perform the compatibility check a single time, significantly speeding up the process compared to installing packages one by one.

Conda allows you to install multiple packages with a single command. You can specify package versions, but leaving them unspecified lets Conda select the most suitable versions.

Here are some examples of commands to create an environment and install packages, as detailed in the [conda documentation](https://docs.conda.io/projects/conda/en/latest/commands/create.html):

```bash
conda create -n <i>ENV_NAME PACKAGE1</i>
conda create -n <i>ENV_NAME</i> python=3.<i>VERSION.MINORVERSION PACKAGE2 PACKAGE3</i>
```

<table>
<thead>
<tr>
<th>When to Use a Conda Module</th><th>Advantages</th><th>Disadvantages</th>
</tr>
</thead>
<tbody>
<tr style="vertical-align:top;">
<td>
When specific libraries or versions required for a project are not available in the Midway3 modules (e.g., TensorFlow 2.1 instead of 2.2)
</td>
<td>
<ul>
<li>Enables creation of isolated environments</li>
<li>Allows for specific Python versions per environment</li>
<li>Ensures compatibility and performance optimization among packages</li>
<li>Supports pip installations within environments</li>
<li>Anaconda curates a performance-optimized package list</li>
<li>Environments are reusable and can be cloned or recreated from detailed recipes</li>
</ul>
</td>
<td>
<ul>
<li>Requires loading and activating the Anaconda module each session</li>
<li>By default, uses the $HOME directory quota for environment storage</li>
<li>Can suffer from I/O bottlenecks due to numerous small files</li>
</ul>
</td>
</tr>
</tbody>
</table>

#### Example: Installing TensorFlow 2

```shell
# Start an interactive session
interact

# Load and activate Anaconda
module load anaconda3
conda activate

# Create and activate a new TensorFlow environment
conda create -n my_tf2_env tensorflow>=2
conda activate my_tf2_env

# Verify installed TensorFlow version
pip freeze | grep tensorflow
    tensorflow==2.6.2
    tensorflow-estimator==2.6.0
```

**NOTE:** Ensure the target directory for Anaconda environments is set to your `"$PROJECT"` folder, which has a much larger quota compared to your $HOME directory.