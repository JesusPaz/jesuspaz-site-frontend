import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class InvestmentGrowthChart extends PureComponent {
    getBarColor = (dataKey, data) => {
        if (data.isDummy) {
            const greyShades = ['#636363', '#707070', '#7d7d7d', '#8a8a8a', '#969696'];
            return greyShades[data.index % greyShades.length]; // Selecciona un tono de gris basado en el índice
        }
        switch (dataKey) {
            case 'Principal':
                return '#2c3e50'; // Azul oscuro para Inversión inicial
            case 'Total_Contributions':
                return '#27ae60'; // Verde para Aportaciones
            case 'Total_Interest':
                return '#f39c12'; // Amarillo para Ganancias
            default:
                return '#d3d3d3'; // Gris como color por defecto
        }
    };

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
                    <Bar dataKey="Principal" name="Inversión inicial" stackId="a" fill={entry => this.getBarColor('Principal', entry)} />
                    <Bar dataKey="Total_Contributions" name="Aportaciones" stackId="a" fill={entry => this.getBarColor('Total_Contributions', entry)} />
                    <Bar dataKey="Total_Interest" name="Ganancias" stackId="a" fill={entry => this.getBarColor('Total_Interest', entry)} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
