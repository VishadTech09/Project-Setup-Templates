import axios from 'axios';

export interface EmailTo {
    email: string,
    name: string
}
export default class EmailService {

    sendEmailUsingBrevo = async (templateId: number, to: Array<EmailTo>, params: any) => {

        const API_KEY = process.env.BREVO_API_KEY;
        const API_URL: string = process.env.BERVO_API_URL || 'https://api.brevo.com/v3/smtp/email';

        const response = await axios.post(
            API_URL,
            {
                'to': to,
                'templateId': templateId,
                'params': params,
                'headers': {
                    //'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
                    'charset': 'iso-8859-1'
                }
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                    'content-type': 'application/json'
                }
            }
        );

        return response.data;
    }

  

    sendEmailUsingSendgrid = async (templateId: string, to: Array<EmailTo>, params: any) => {

        const API_KEY = process.env.SENDGRID_API_KEY;
        const API_URL: string = process.env.SENDGRID_API_URL || 'https://api.sendgrid.com/v3/mail/send';

        const response = await axios.post(
            API_URL,
            {
                'from': {
                    'email': process.env.SENDGRID_FROM_EMAIL || 'example@gmail.com'
                },
                'personalizations': [
                    {
                        'to': to,
                        'dynamic_template_data': params
                    }
                ],
                'template_id': templateId
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    }
}