import React, { Component } from "react";
import ElectionContract from './contracts/Election.json';
import getWeb3 from "./getWeb3";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import "./App.css";
import Button from "@material-ui/core/Button";

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = { storageValue: 0, web3: null, accounts: null, contract: null, rows: [], hasVoted: false, candidateId: '1' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.initData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange = (event) => {
    this.setState({ candidateId: event.target.value });
  };

  initData = async () => {
    const { contract, accounts } = this.state;
    const rows = [];

    // Get number of candidates
    const candidatesCount = await contract.methods.candidatesCount().call();
    for(let i = 1; i <= candidatesCount; i++) {
      const candidate = await contract.methods.candidates(i).call();
      rows.push(this.createData(candidate[0], candidate[1], candidate[2]));
    }

    // Get if user hasVoted
    const hasVoted = await contract.methods.voters(accounts[0]).call();

    // Set State of number of candidates and has voted
    this.setState({ rows, hasVoted });
  };

  createData = (id, name, voteCount) => {
    return { id, name, voteCount }
  };

  vote = async () => {
    const { contract, accounts } = this.state;
    // Call vote function
    await contract.methods.vote(this.state.candidateId).send({from: accounts[0]});
    window.location.reload();
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Election Results</h1>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align={"right"}>Name</TableCell>
                <TableCell align={"right"}>Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component={"th"} scope={"row"}>
                      { row.id }
                    </TableCell>
                    <TableCell align={"right"}>{row.name}</TableCell>
                    <TableCell align={"right"}>{row.voteCount}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!this.state.hasVoted ? (
            <FormControl>
              <Select value={this.state.candidateId} onChange={this.handleChange} displayEmpty>
                {this.state.rows.map(row => (
                    <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a Candidate</FormHelperText>
              <Button variant="contained" onClick={this.vote}>Vote</Button>
            </FormControl>
        ):null}
        <p>Your account: { this.state.accounts[0] }</p>
      </div>
    );
  }
}

export default App;
