import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

export default class InvestmentGrowthChart extends PureComponent {
    render() {
        const { data } = this.props;
        const hasData = data && data.length > 0;

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 40,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis label={{ value: 'Valor ($)', angle: 0, position: 'insideBottomLeft', dy: -10 , dx: -10 }} />


                        {hasData ? <Tooltip /> : null}
                        {hasData ? <Legend wrapperStyle={{ color: 'black' }} /> : null}
                        <Bar dataKey="Principal" name="Inversión inicial" stackId="a" fill="#2c3e50" />
                        <Bar dataKey="Total_Contributions" name="Aportaciones" stackId="a" fill="#27ae60" />
                        <Bar dataKey="Total_Interest" name="Ganancias" stackId="a" fill="#f39c12" />
                    </BarChart>
                </ResponsiveContainer>
                {!hasData && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Text width={500} style={{ fill: 'black', fontSize: 20, textAlign: 'center' }}>No hay datos disponibles</Text>
                    </div>
                )}
            </div>
        );
    }
}
