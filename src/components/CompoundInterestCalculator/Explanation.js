import { Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails, useTheme, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

function CompoundInterestExplanation() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const frequentlyAskedQuestions = [
        { question: "¿Cómo funciona el interés compuesto?", answer: "El interés compuesto se calcula sobre el monto inicial y sobre los intereses que se han acumulado en periodos anteriores." },
        { question: "¿Por qué el interés compuesto es poderoso?", answer: "El interés compuesto puede llevar a un crecimiento exponencial de tu dinero, ya que ganas intereses sobre tus intereses." },
        { question: "¿Cómo puedo empezar a ganar interés compuesto?", answer: "Puedes empezar a ganar interés compuesto invirtiendo tu dinero en cuentas de ahorro, fondos mutuos, acciones, bonos u otros instrumentos de inversión." },
        { question: "¿Es mejor el interés compuesto que el interés simple?", answer: "Sí, el interés compuesto generalmente resulta en un crecimiento más rápido de tu dinero en comparación con el interés simple." },
        { question: "¿Cómo afecta la frecuencia de capitalización al interés compuesto?", answer: "Cuanto más frecuente sea la capitalización, mayores serán los beneficios del interés compuesto." },
        { question: "¿Puedo calcular el interés compuesto manualmente?", answer: "Sí, pero las fórmulas pueden ser complejas. Es más fácil usar una calculadora de interés compuesto en línea." },
        { question: "¿El interés compuesto siempre trabaja a mi favor?", answer: "El interés compuesto puede trabajar a tu favor cuando estás invirtiendo, pero también puede aumentar rápidamente tus deudas si tienes préstamos con interés compuesto." },
        { question: "¿Cómo afecta el tiempo al interés compuesto?", answer: "Cuanto más tiempo dejes tu dinero invertido, más tiempo tiene para crecer gracias al interés compuesto." },
        { question: "¿Puedo beneficiarme del interés compuesto si hago depósitos regulares?", answer: "Sí, hacer depósitos regulares puede aumentar significativamente los beneficios del interés compuesto." },
        { question: "¿Qué tipo de cuentas ofrecen interés compuesto?", answer: "Muchas cuentas de ahorro, cuentas del mercado monetario, y certificados de depósito ofrecen interés compuesto." },
    ];

    return (
        <Box mt={4} p={3} bgcolor="white" color={theme.palette.text.primary} borderRadius={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Descubre el Poder del Interés Compuesto
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        El <strong>interés compuesto</strong> es un fenómeno financiero que actúa como una bola de nieve: tus ganancias generan más ganancias, y esas ganancias generan aún más. Al invertir una cantidad de dinero y dejarla crecer, los intereses que ganas en cada periodo también empiezan a generar sus propios intereses.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        A lo largo del tiempo, incluso pequeñas inversiones pueden transformarse en sumas significativas gracias al <strong>interés compuesto</strong>. Este efecto se potencia aún más si realizas aportes regulares a tu inversión. ¡La clave está en la paciencia y la consistencia!
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <InfoIcon color="disabled" style={{ fontSize: isSmallScreen ? 100 : 150 }} />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Preguntas Frecuentes sobre el Interés Compuesto
                    </Typography>
                    {frequentlyAskedQuestions.map((faq, index) => (
                        <Accordion key={index} style={{ backgroundColor: theme.palette.grey[200] }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: theme.palette.grey[300] }}>
                                <Typography color="textSecondary">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: 'white' }}>
                                <Typography>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CompoundInterestExplanation;
