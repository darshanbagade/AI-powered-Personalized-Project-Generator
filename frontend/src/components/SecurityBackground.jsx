import React from 'react';
import { Shield, Lock, Eye, Key, Fingerprint } from 'lucide-react';

const SecurityBackground = ({ children }) => {
  return (
    <div className="cyber-mesh-bg min-h-screen">
      {/* Floating Security Icons */}
      <div className="security-icons">
        <Shield className="security-icon text-4xl" />
        <Lock className="security-icon text-3xl" />
        <Eye className="security-icon text-4xl" />
        <Key className="security-icon text-3xl" />
        <Fingerprint className="security-icon text-4xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SecurityBackground; 