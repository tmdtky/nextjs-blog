"use client";

import React, { useState } from 'react';
import { Label } from '../_components/Contact/Label';
import { FormGroup } from '../_components/Contact/FormGroup';
import { Input } from '../_components/Contact/Input';
import { Textarea } from '../_components/Contact/Textarea';
import { ErrorMessage } from '../_components/Contact/ErrorMessage';
import { API_BASE_URL } from '@/constants';
import { ContactFormData } from '../_types';

const Contact: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [messageErrorMessage, setMessageErrorMessage] = useState<string>('');

  /** バリデーション */
  const valid = (): boolean => {
    let isValid = true;
    let nameError = '';
    let emailError = '';
    let messageError = '';

    if (!name) {
      nameError = 'お名前は必須です。';
      isValid = false;
    } else if (name.length > 30) {
      nameError = 'お名前は30文字以内で入力してください。';
      isValid = false;
    }

    if (!email) {
      emailError = 'メールアドレスは必須です。';
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      emailError = 'メールアドレスの形式が正しくありません。';
      isValid = false;
    }

    if (!message) {
      messageError = '本文は必須です。';
      isValid = false;
    } else if (message.length > 500) {
      messageError = '本文は500文字以内で入力してください。';
      isValid = false;
    }

    setNameErrorMessage(nameError);
    setEmailErrorMessage(emailError);
    setMessageErrorMessage(messageError);

    return isValid;
  };

  /** フォームの送信 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!valid()) return;

    setIsSubmitting(true);

    try {
      const formData: ContactFormData = { name, email, message };
      
      await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      alert('送信しました。');
      handleClear();
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** フォームのクリア */
  const handleClear = (): void => {
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[800px] mx-auto py-10">
        <h1 className="text-xl font-bold mb-10 text-gray-900">問合わせフォーム</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label text="お名前" htmlFor="name" className="text-gray-900" />
            <div className="w-full">
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(value: string) => setName(value)}
                disabled={isSubmitting}
              />
              <ErrorMessage message={nameErrorMessage} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label text="メールアドレス" htmlFor="email" className="text-gray-900" />
            <div className="w-full">
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(value: string) => setEmail(value)}
                disabled={isSubmitting}
              />
              <ErrorMessage message={emailErrorMessage} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label text="本文" htmlFor="message" className="text-gray-900" />
            <div className="w-full">
              <Textarea
                id="message"
                value={message}
                onChange={(value: string) => setMessage(value)}
                disabled={isSubmitting}
              />
              <ErrorMessage message={messageErrorMessage} />
            </div>
          </FormGroup>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-bold py-2 px-4 rounded-lg mr-4 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className={`font-bold py-2 px-4 rounded-lg ${
                isSubmitting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;