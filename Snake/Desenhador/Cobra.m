clear all;
close all;
clc;

I = imread('contorno.png');
I = rgb2gray(I);
[M, N] = size(I);

preto = zeros(1, 1, 3);
S = 255 * ones(M, N, 3);
S(:,:,1) = I;

vermelho = zeros(1, 1, 3);
vermelho(1,1,1) = 255;

verde = zeros(1, 1, 3);
verde(1,1,2) = 255;

li = [];
lj = [];
for i = 1 : M
    for j = 1 : N
        if I(i, j) == 0
            li = [li, i];
            lj = [lj, j];
        end
    end
end

lio = li;
ljo = lj;

lsi = [li(1)];
lsj = [lj(1)];
idx = 1;
R = 12.5;

li(1) = [];
lj(1) = [];

for u = 1 : 2000
    if idx > length(lsi)
        break;
    end
    i0 = lsi(idx);
    j0 = lsj(idx);
    S(i0, j0, :) = verde;
    idx = idx + 1;
    V = [];
    Vv = [];
    Vd = [];
    for k = 1 : length(li)
        dist = (li(k) - i0)^2 + (lj(k) - j0)^2;
        if dist <= (R+1)^2
            V = [V, k];
            Vd = [Vd, k];
            if dist >= (R-1)^2
                Vv = [Vv, k];
            end
        end
    end
    if isempty(Vv)
        break;
    end
    dist = -100 * ones(1, length(Vv));
    for k = 1 : length(Vv)
        for v = 1 : length(lsi)
            distt = (li(Vv(k)) - lsi(v))^2 + (lj(Vv(k)) - lsj(v))^2;
            if dist(k) < distt
                dist(k) = distt;
            end
        end
    end
    [~, il] = max(dist);
    mi = li(Vv(il));
    mj = lj(Vv(il));
    lsi = [lsi, mi];
    lsj = [lsj, mj];
    for k = 1 : length(V)
        S(li(V(k)), lj(V(k)), :) = vermelho;
    end
    li(V) = [];
    lj(V) = [];
end
%%

S = 1 * ones(M, N, 3);
S(:,:,1) = 200 * S(:,:,1);
S(:,:,2) = 160 * S(:,:,2);
S(:,:,3) = 120 * S(:,:,3);
Rg = 110;
for i = 1 : M
    for j = 1 : N
        for k = 1 : length(lsi)
            i0 = lsi(k);
            j0 = lsj(k);
            dist = (i - i0)^2 + (j - j0)^2;
            if (Rg-0.5)^2 <= dist && dist <= (Rg+0.5)^2
                S(i, j, :) = preto;
            end
        end
    end
end

imwrite(uint8(S), 'testes.png');