import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class InvestmentGrowthChart extends PureComponent {
    render() {
        const { data } = this.props;

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Year" />
                    <YAxis label={{ value: 'Valor ($)', angle: -90, position: 'insideLeft', offset: -10 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ color: 'black' }} />
                    <Bar dataKey="Principal" name="Inversión inicial" stackId="a" fill="#2c3e50" />
                    <Bar dataKey="Total_Contributions" name="Aportaciones" stackId="a" fill="#27ae60" />
                    <Bar dataKey="Total_Interest" name="Ganancias" stackId="a" fill="#f39c12" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
