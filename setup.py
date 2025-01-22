from setuptools import setup, find_packages

setup(
    name="data_cleaner",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pandas>=1.0.0",
        "numpy>=1.18.0",
    ],
    author="Patrick Waga Odongo",
    author_email="wagaodongo@gmail.com",
    description="A library for data cleaning operations",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/data_cleaner",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)