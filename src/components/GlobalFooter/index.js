import React from 'react';
import classNames from 'classnames';
import styles from './index.scss';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames('global-footer', className);
  return (
    <div className={clsString}>
      {links && (
        <div className='links'>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className='copyright'>{copyright}</div>}
    </div>
  );
};

export default GlobalFooter;
