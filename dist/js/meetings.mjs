'use strict';

const meetingModule = (function () {
  let localStream;
  let remoteStream;
  let peerConnection;
  let user1;
  let user2;

  const servers = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
      }
    ]
  };

  async function init() {
    if ('mediaDevices' in navigator) {
      try {
        const userDeviceConstraints =
          await navigator.mediaDevices.getSupportedConstraints();
        localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        window.addEventListener('DOMContentLoaded', () => {
          user1 = document.querySelector('#user-1');
          user1.srcObject = localStream;
        });
      } catch (error) {
        console.error(error);
      } finally {
        return true;
      }
    }
  }

  async function createOffer() {
    peerConnection = new RTCPeerConnection();
    remoteStream = new MediaStream();
    window.addEventListener('DOMContentLoaded', () => {
        user2 = document.querySelector('#user-2');
        user2.srcObject = remoteStream;
    });

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    });

    peerConnection.ontrack = (track) => {
      track.streams[0].getTracks.forEach(track => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (icecandidate) => {
      if (icecandidate.candidate) {

      }
    };
    
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
  }

  return { localStream, remoteStream, peerConnection, user1, user2, initialized: init() };
})();
