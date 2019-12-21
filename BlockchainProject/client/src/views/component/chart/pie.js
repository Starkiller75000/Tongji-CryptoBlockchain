import React, {Component} from "react";
import {Pie} from 'react-chartjs-2';

class CPie extends Component {

    dataPie = () => {
        return {
            labels: [
                'C++',
                'Go',
                'Java',
                'Python',
                'Ruby',
                'Rust'
            ],
                datasets: [{
            data: this.props.datas,
            backgroundColor: [
                '#B71C1C',
                '#880E4F',
                '#4A148C',
                '#66BB6A',
                '#D84315',
                '#FFFF00'
            ],
            hoverBackgroundColor: [
                '#B71C1C',
                '#880E4F',
                '#4A148C',
                '#66BB6A',
                '#D84315',
                '#FFFF00'
            ]
        }]
        }
    };

    state = {};

    render() {
        return(
            <div style={{ maxWidth: 400, textAlign: 'center', margin: '0 auto' }}>
                <Pie data={this.dataPie} height={10} width={10} />
            </div>
        )
    }
}

export default CPie;