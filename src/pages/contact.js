import React from 'react'
import Layout from '../components/Layout'
import Head from '../components/Head'

const ContactPage = () => {
    return(
        <Layout>
            <Head title="contact"/>
            <h1>Contact</h1>
            <p>Please contact maruo@maruo.com </p>
            <p>Need a developer 
                <a href="https://twitter.com" target="_blank"
                rel="noopener noreferrer" >Twitter</a></p>

        </Layout>

    )
}

export default ContactPage