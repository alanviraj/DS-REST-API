import React from 'react'

export default class HeaderNormal extends React.Component{
    render(){        
        return (           
            <div>
                <header id="header">
                    <nav>
                        <div className="container">
                            <div className="text-center">
                            <h1>Shop Online</h1>
                                <div>
                                    <button className="btn" ><a href="/towardsRegisterPage">Register</a></button>
                                    <button className="btn" ><a href="/login">Login</a></button>
                                </div>
                            </div>
                        </div>
                       
                    </nav>
                </header>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossOrigin="anonymous"></script>
<script src="/js/index.js"></script>
</div>
        );
    }
}