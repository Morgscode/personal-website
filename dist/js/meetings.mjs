'use strict';

const meetingModule = (function () {
  let appId = '41df17c7b7824c59ac7b2c3490fa172a';
  let localStream;
  let remoteStream;
  let peerConnection;
  let user1;
  let user2;
  const userDevices = {
    video: false,
    audio: false,
  };
  const servers = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
      }
    ]
  };

  function submitUserDevices(submit) {
    submit.preventDefault();
    const formData = new FormData(submit.target);
    const video = formData.get('video');
    const audio = formData.get('audio');
    if (video === 'on') {
      userDevices.video = true;
    }
    if (audio === 'on') {
      userDevices.audio = true;
    }
    initMeeting();
    submit.path[1].close();
  }

  async function initMeeting() {
    try {
      const meetingAppIdResposne = await fetch(`${window.location.origin}/.netlify/functions/getMeetingAppId`);
      // const data = await meetingAppIdResposne.json();
      // if (!request.ok) {
      //   throw new Error();
      // }
    } catch (error) {
      alert('there was a problem setting up the app');
      return;
    }
    console.log('runs');
    if ('mediaDevices' in navigator) {
      try {
        localStream = await navigator.mediaDevices.getUserMedia(userDevices);
        window.addEventListener('DOMContentLoaded', () => {
          user1 = document.querySelector('#user-1');
          user1.srcObject = localStream;
        });
        await createOffer();
      } catch (error) {
          alert('There was a problem enableing your selected devices');
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
        console.log(icecandidate);
      }
    };
    
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log(offer);
  }

  function attach() {
    let attached = false;
    window.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('form#user-devices');
      if (form) {
        form.addEventListener('submit', submitUserDevices);
        attached = true;
      }
    });
    return attached;
  }

  return { localStream, remoteStream, peerConnection, user1, user2, userDevices, submitUserDevices, attached: attach() };
})();

export { meetingModule };
