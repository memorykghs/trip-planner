import React, {useEffect, useState} from 'react';
import '../styles/password.css';

const CORRECT_PASSWORD = 'Ashleyyy';

function PasswordPage({onUnlock}) {
    const [inputPassword, setInputPassword] = useState('');

    /* 此頁為滿版 */
    useEffect(() => {
        document.body.classList.add('password-active');
        document.documentElement.classList.add('password-active'); // html element

        const root = document.getElementById('root');
        root && root.classList.add('password-active');

        return () => {
            document.body.classList.remove('password-active');
            document.documentElement.classList.remove('password-active');
            root && root.classList.remove('password-active');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputPassword === CORRECT_PASSWORD) {
            onUnlock();
        } else {
            alert('密碼錯誤');
        }
    };

    return (
        <div className="password-wrapper">
            <form onSubmit={handleSubmit}>
                <h2>請輸入密碼以查看行程</h2>
                <div className="password-input-group">
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        placeholder="輸入密碼"
                        className="password-input"
                    />
                    <button type="submit" className="password-button" onClick={handleSubmit}>
                        <img src="/icons/icons8-enter-48.png" alt="" style={{width: '30px', height: '30px'}}/>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PasswordPage;