# ��� #

## �����ƥ๽�� ##

  * Worker �ǥ����뤷�� DOM(JSONized)�������꥽������JS,CSS,Image,WebFonts�ˤ���¸��
    * SWF ��롩
  * JobServer �ǥ������оݤΥ᥿�ǡ������� Job ���ꡤ����ˤ������ä� Worker ��������
    * �᥿�ǡ��������Ф� Job �����Ф���
  * Viewer �Ǹ���������䥯�����оݤΤ��줳�����������롥
  * MetaServer �ǥ������оݤΥ᥿�ǡ������ݻ�
    * ��������о� URL
    * ���å�����UA��
    * �ֳ�
    * ̾�Ρ���ݥ��ȥ� path��

### ���� ###

  * Viewer ���� git �θ�����ݥ��ȥ� ( bare ��ݥ��ȥ� ) �������Ƥ뤳��
  * Worker ���� bare ��ݥ��ȥ�� push �Ǥ��뤳��

## �ƥץ�������� ##

### Worker ###

������

server ���� Job ����äƤ��� PhantomJS ��ͳ�� DOM �� JSON �����ơ������γ����꥽������������� git commit

### JobServer ###

Worker ���Ф���ޥ�����

�ƥ�������оݤ�����˽��ä� Job ��������� JobServer ����Ͽ��

### MetaServer ###

��������оݤΥ᥿�ǡ������ݻ�����

DB? mongo �Ȥ���

### Viewer ###

Web ���󥿥ե�����

  * ��������оݤ���Ͽ
  * ��������оݤΥ᥿��������
    * �������Խ���
    * �����
  * ��������оݤ�����(git)�α���

## �ǡ�����¤ ##

### Job ###

  * URL
  * UA
  * Cookie ( cookie file path )
  * Repository Path

### Meta ###

  * Name
  * URL
  * repository-path
  * time-span

## ��Ͽ ##

  1. Viewer ���� Meta �ǡ���������
  2. MetaServer �� Viewer �� bare ��ݥ��ȥ����
  3. JobServer �� clone �ȥ������ Job ����
  4. Worker �� clone ���ƽ��Υ�����

## ¾ ##
